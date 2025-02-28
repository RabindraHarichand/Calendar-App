import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from "../../../src/store/calendar/calendarSlice";
import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
} from "../../fixtures/calendarStates";

describe("Pruebas en calendarSlice", () => {
  test("debe regresar el estado por defecto", () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test("onSetActiveEvent debe activar el evento", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );

    expect(state.activeEvent).toEqual(events[0]);
  });

  test("onAddNewEvent debe agregar el evento", () => {
    const newEvent = {
      id: "3",
      start: new Date("2020-10-21 13:00:00"),
      end: new Date("2020-10-21 13:00:00"),
      title: "Cumpleanos de Fernando!!!",
      notes: "Hay que comprar el pastel!!",
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );

    expect(state.events).toEqual([...events, newEvent]);
  });

  test("onUpdateEvent debe actualizar el evento", () => {
    const updatedEvent = {
      id: "1",
      start: new Date("2020-10-21 13:00:00"),
      end: new Date("2020-10-21 13:00:00"),
      title: "Cumpleanos de Fernando actualizado",
      notes: "Hay que comprar el pastel actualizado",
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    );

    expect(state.events).toContain(updatedEvent);
  });

  test("onDeleteEvent debe borrar el evento activo", () => {
    //calendarWithActiveEventState
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );

    expect(state.activeEvent).toBe(null);
    expect(state.events).not.toContain(events[0]);
  });

  test("onLoadEvents debe establecer los eventos", () => {
    //initalState
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));

    expect(state.isLoadingEvents).toBeFalsy();
    expect(state.events).toEqual(events);

    const newState = calendarSlice.reducer(state, onLoadEvents(events));
    expect(state.events.length).toBe(events.length);
  });

  test("onLogoutCalendar debe limpiar el estado", () => {
    //calendarWithActiveEventState
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogoutCalendar()
    );

    // expect(state.events).toEqual([]);
    // expect(state.activeEvent).toBe(null);
    expect(state).toEqual(initialState);
  });
});
