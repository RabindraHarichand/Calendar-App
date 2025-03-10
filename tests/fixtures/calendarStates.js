export const events = [
  {
    id: "1",
    start: new Date("2022-10-21 13:00:00"),
    end: new Date("2022-10-21 13:00:00"),
    title: "Cumpleanos de Fernando",
    notes: "Hay que comprar el pastel",
  },
  {
    id: "2",
    start: new Date("2022-11-09 13:00:00"),
    end: new Date("2022-11-09 13:00:00"),
    title: "Cumpleanos de Juan",
    notes: "Nota de Juan",
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
};
