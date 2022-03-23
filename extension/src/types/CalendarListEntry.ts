export type CalendarId = string;

export default interface CalendarListEntry {
  kind?: 'calendar#calendarListEntry';
  etag?: string;
  id?: CalendarId;
  summary: string;
  description?: string;
  location?: string;
  timeZone: string;
  summaryOverride?: string;
  colorId?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  hidden?: boolean;
  selected?: boolean;
  accessRole?: string;
  defaultReminders?: Array<{
    method?: string;
    minutes?: number;
  }>;
  notificationSettings?: {
    notifications?: Array<{
      type?: string;
      method?: string;
    }>;
  };
  primary?: boolean;
  deleted?: boolean;
  conferenceProperties?: {
    allowedConferenceSolutionTypes?: [string];
  };
}
