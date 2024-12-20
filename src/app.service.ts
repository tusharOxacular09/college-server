import { Injectable } from '@nestjs/common';

// The AppService class is marked as injectable, meaning it can be injected into other parts of the application
@Injectable()
export class AppService {
  // The getHello() method returns a string message
  getHello(): string {
    return 'Welcome to college server, we are live now 🚀.'; // A static message to indicate the server is live
  }
}
