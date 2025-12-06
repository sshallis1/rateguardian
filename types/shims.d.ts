declare module "@vercel/node" {
  export interface VercelRequest extends Partial<Request> {
    query?: Record<string, string | string[]>;
    body?: any;
  }

  export interface VercelResponse {
    status: (statusCode: number) => VercelResponse;
    json: (body: any) => void;
    send: (body: any) => void;
  }
}
