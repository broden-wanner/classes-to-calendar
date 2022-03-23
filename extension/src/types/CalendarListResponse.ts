import CalendarListEntry from './CalendarListEntry';

export default interface CalendarListResponse {
  kind: 'calendar#calendarList';
  etag: string;
  nextPageToken: string;
  nextSyncToken: string;
  items: CalendarListEntry[];
}
