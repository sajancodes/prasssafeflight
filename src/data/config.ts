export interface AppConfig {
  recipientName: string;
  senderName: string;
  originCountry: string;
  originCity: string;
  destinationCountry: string;
  destinationCity: string;
  departureDate?: string;
  theme: string;
}

export const appConfig: AppConfig = {
  recipientName: "Prasamsa Didi",
  senderName: "With all our love from Nepal",
  originCountry: "Nepal",
  originCity: "Kathmandu",
  destinationCountry: "Canada",
  destinationCity: "Toronto / Vancouver",
  theme: "Nepal → Canada — A New Chapter",
};
