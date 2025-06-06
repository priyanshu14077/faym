
export interface EventRequest {
    user_id: string;
    event_type: 'view' | 'click' | 'location';
    payload: Record<string, any>;
  }
  
  export interface EventResponse {
    success: boolean;
    event_id?: string;
    message?: string;
  }
  
  export interface AnalyticsQuery {
    event_type?: 'view' | 'click' | 'location';
    start_date?: string;
    end_date?: string;
  }
  
  export interface EventCountResponse {
    total_events: number;
  }
  
  export interface EventCountsByTypeResponse {
    [key: string]: number;
  }