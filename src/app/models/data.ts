
export interface Data {
    GPS: {
      status: string;
      error: string;
      devices: {
        [key: string]: {
          puerto: string;
          status: string;
          data: {
            lat: string;
            long: string;
            date: string;
            time: string;
          } | null;
        };
      };
    };
    GPRS: {
      status: string;
      error: string | null;
      interfaces: {
        [key: string]: {
          is_up: boolean;
          has_internet: boolean;
          can_resolve_dns: boolean;
        };
      };
    };
    PM: {
      lowBattery: boolean;
      mainPower: string;
    };
  }
  