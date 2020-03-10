/**
 * Created by alao on 3/10/2020.
 */
export class DataResponse<T> {
  responseCode: string;
  valid: boolean;
  data: T[];
  messages: string[];
}
