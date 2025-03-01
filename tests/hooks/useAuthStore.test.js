import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { Provider } from "react-redux";
import { testUserCredentials } from "../fixtures/testUser";
import calendarApi from "../../src/api/calendarApi";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe("Pruebas en useAuthStore", () => {
  beforeEach(() => localStorage.clear());

  test("debe regresar los calores por defecto", () => {
    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      errorMessage: undefined,
      status: "checking",
      user: {},
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });

  test("startLogin debe realizar el login correctamente", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "Fernando", uid: "67bb2b6b1c6dc63d53bd70d5" },
    });

    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  });

  test("startLogin debe fallar la autenticacion", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin({
        email: "algo@google.com",
        password: "123456789",
      });
    });

    const { errorMessage, status, user } = result.current;
    expect(localStorage.getItem("token")).toBe(null);
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: "Crendiciales Incorrectas",
      status: "not-authenticated",
      user: {},
    });

    await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
  });

  test("startRegister debe crear un usuario", async () => {
    const newUser = {
      email: "algo@google.com",
      password: "2134fa",
      name: "TestUser2",
    };

    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const spy = jest.spyOn(calendarApi, "post").mockReturnValue({
      data: {
        ok: true,
        uid: "ALGUN-ID",
        name: "TesUser",
        token: "ALGUN-TOKEN",
      },
    });

    await act(async () => {
      await result.current.startRegister(newUser);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "TesUser", uid: "ALGUN-ID" },
    });

    spy.mockRestore();
  });

  test("startRegister debe fallar la creacion", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startRegister(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: "Un usuario existe con ese correo",
      status: "not-authenticated",
      user: {},
    });
  });
});
