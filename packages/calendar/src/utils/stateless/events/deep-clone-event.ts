import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import CalendarEventBuilder from '../../stateful/calendar-event/calendar-event.builder'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

export const deepCloneEvent = (
  calendarEvent: CalendarEventInternal,
  $app: CalendarAppSingleton
) => {
  const calendarEventInternal = new CalendarEventBuilder(
    $app.config,
    calendarEvent.id,
    {
      ...calendarEvent.time,
    }
  )
    .withTitle(calendarEvent.title)
    .withPeople(calendarEvent.people)
    .withCalendarId(calendarEvent.calendarId)
    .withForeignProperties(
      JSON.parse(JSON.stringify(calendarEvent._getForeignProperties()))
    )
    .withLocation(calendarEvent.location)
    .withDescription(calendarEvent.description)
    .build()
  calendarEventInternal._nDaysInGrid = calendarEvent._nDaysInGrid

  return calendarEventInternal
}