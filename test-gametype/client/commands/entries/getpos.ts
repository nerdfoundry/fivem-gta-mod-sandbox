import { Game } from '@nativewrappers/client';
import { addSuggestion, Chat } from '../../utils/Messaging.js';

const command = async (_source: number, args: string[], _raw: string) => {
  Chat(`Current Location: ${JSON.stringify(Game.PlayerPed.Position)}`);
  Chat(`Current Rotation: ${Game.PlayerPed.Heading}`);
  Chat(`Current Heading: ${JSON.stringify(Game.PlayerPed.Rotation)}`);
};

RegisterCommand('getpos', command, false);
addSuggestion('getpos', 'Get the positional data of the PlayerPed');
