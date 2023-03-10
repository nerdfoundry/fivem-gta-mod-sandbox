export const Chat = (msg: string | string[]) => {
  console.log(msg);

  emit('chat:addMessage', {
    args: Array.isArray(msg) ? msg : [msg]
  });
};

export const Alert = (msg: string) => {
  console.info(msg);
  SetTextComponentFormat('STRING');
  AddTextComponentString(msg);
  DisplayHelpTextFromStringLabel(0, false, true, -1);
};

export const Notify = (msg: string) => {
  console.info(msg);
  SetNotificationTextEntry('STRING');
  AddTextComponentString(msg);
  DrawNotification(true, false);
};

export type SuggestionParam = { name: string; help: string };
export const addSuggestion = (commandName: string, description: string, params?: SuggestionParam[]) =>
  emit('chat:addSuggestion', `/${commandName}`, description, params);
export const removeSuggestion = (commandName: string) => emit('chat:removeSuggestion', `/${commandName}`);
