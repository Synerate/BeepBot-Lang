export class Active {
	activeChannels: Channels = {};

  constructor() {
    this.activeChannels["testing"].push({
      "cb65919a-8628-4427-b3b2-c9a5dea1d992": 1,
      "faa45d7f-8c4d-42e2-a445-97ecaf0c871d": 20,
      "c185385a-2014-4c4b-af93-ef3991cbdf84": 2
    });
  }

  addUser(channel: string, userId: string): void {
    if (this.activeChannels[channel] == null) {
      this.activeChannels[channel] = [];
    }
    this.activeChannels[channel].push({ userId: 0 });
  }

  deleteUser(channel: string, userId: string): void {
    if (this.activeChannels[channel] != null) {
      let activeUsers = this.activeChannels[channel];
      activeUsers.forEach((value, index) => {
        console.log(value, index);
      });
    }
  }
}

export interface Channels {
  [channelId: string]: ActiveUser[]; 
}

interface ActiveUser {
  [userId: string]: number;
}
