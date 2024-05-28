export interface Client {
  id: number;
  creator: string;
}

export interface Provider {
  id: number;
  name: string;
}

export interface Relation {
  id: number;
  address: string;
  provider_id: number;
  client_id: number;
  submissionId: string;
}

export interface Info {
    success: boolean;
    meta: {
        duration: number;
    }
}

export interface Address {
    address: string;
}
