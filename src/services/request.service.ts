import axios from "axios";

import { Response } from "@/models/Response";
import { ResponseStatusType } from "@/models/ResponseStatusType";
import { javaBackendURL } from "@/common/variables";

import { Model } from "@/models/Model";
import { APIResponse } from "@/models/APIResponse";

export class RequestService {
  private BackendUrl: string;

  constructor() {
    this.BackendUrl = javaBackendURL;
  }

  public async _POST(url: string, data: Model): Promise<Response> {
    let response: Response = new Response(
      ResponseStatusType.INFORMATION,
      "Request not completed",
      []
    );

    await axios
      .post(`${this.BackendUrl}${url}`, data)
      .then(res => {
        response = new Response(res.data.type, res.data.message, res.data.data);
      })
      .catch((err: APIResponse) => {
        response = new Response(
          ResponseStatusType.ERROR,
          err.message || "Unexpected error, try again later.",
          err.data || []
        );
      });

    return response;
  }

  public async _GET(url: string): Promise<Response> {
    let response: Response = new Response(
      ResponseStatusType.INFORMATION,
      "Request not completed",
      []
    );

    await axios
      .get(`${this.BackendUrl}${url}`)
      .then(res => {
        response = new Response(res.data.type, res.data.message, res.data.data);
      })
      .catch((err: APIResponse) => {
        response = new Response(
          ResponseStatusType.ERROR,
          err.message || "Unexpected error, try again later.",
          err.data || []
        );
      });

    return response;
  }

  public async _GET_ID(url: string, id: string): Promise<Response> {
    let response: Response = new Response(
      ResponseStatusType.INFORMATION,
      "Request not completed",
      []
    );

    await axios
      .get(`${this.BackendUrl}${url}/${id}`)
      .then(res => {
        response = new Response(res.data.type, res.data.message, res.data.data);
      })
      .catch((err: APIResponse) => {
        response = new Response(
          ResponseStatusType.ERROR,
          err.message || "Unexpected error, try again later.",
          err.data || []
        );
      });

    return response;
  }

  public async _PUT(url: string, data: Model): Promise<Response> {
    let response: Response = new Response(
      ResponseStatusType.INFORMATION,
      "Request not completed",
      []
    );

    await axios
      .post(`${this.BackendUrl}${url}`, data)
      .then(res => {
        response = new Response(res.data.type, res.data.message, res.data.data);
      })
      .catch((err: APIResponse) => {
        response = new Response(
          ResponseStatusType.ERROR,
          err.message || "Unexpected error, try again later.",
          err.data || []
        );
      });

    return response;
  }

  public async _DELETE(url: string, id: string): Promise<Response> {
    let response: Response = new Response(
      ResponseStatusType.INFORMATION,
      "Request not completed",
      []
    );

    await axios
      .delete(`${this.BackendUrl}${url}/${id}`)
      .then(res => {
        response = new Response(res.data.type, res.data.message, res.data.data);
      })
      .catch((err: APIResponse) => {
        response = new Response(
          ResponseStatusType.ERROR,
          err.message || "Unexpected error, try again later.",
          err.data || []
        );
      });

    return response;
  }
}
