import { getCurrentDate } from "cypress/utils";

interface MissionPayload {
    launchDate: string;
    mission: string;
    rocket: string;
    target: string;
}

export const missionPayload: MissionPayload = {
    launchDate: getCurrentDate(),
    mission: 'Test Mission',
    rocket: 'Explorer IS1',
    target: 'Kepler-442 b'
};

