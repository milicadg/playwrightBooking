import { APIRequestContext } from '@playwright/test';

export class RoomApi {
  

  path = '/room';
  roomName: string;
  roomType: string;
  roomAccessible: boolean;
  image: string;
  description: string;
  features: [boolean, boolean, boolean, boolean, boolean, boolean];
  roomPrice: string;  

  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createRoom (roomName: string, roomType: string, roomAccessible: boolean, imagePath: string, description: string,
    features:string[], roomPrice: string) {
       const response = await this.request.post(`${this.path}/`, {
        data: {
          'roomName': roomName,
          'type': roomType,
          'accessible': roomAccessible,
          'image': imagePath,
          'description': description,
          'features': features,
          'roomPrice': roomPrice
        }
      });
      return response;
  }

  async deleteRoom( roomId: number){
    const response = await this.request.delete(`${this.path}/${roomId}`);
    return response;
  }
}

