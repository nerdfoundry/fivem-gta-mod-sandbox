import { Game, Vector3 } from '@nativewrappers/client';
import { RandomPedModel } from './utils/Entities.js';
import { Chat } from './utils/Messaging.js';
import { ArrayRandom } from './utils/Misc';
import { Register as RegisterWhatAmI } from './whatami/index.js';

const WELCOMES = [
  'Welcome to the party,',
  'Glad you could join us,',
  'Thanks for playing with us,',
  "Hey look - it's you,",
  'Watch out, here comes',
  'Lookin good,'
];

const SpawnOpts = new Vector3(684.976, 573.848, 130.461);
const SpawnHeading = 160;
const WalkToOffset = SpawnOpts.add(new Vector3(-1, -3, 0));

const onSpawn = async () => {
  const chosenMsg = ArrayRandom(WELCOMES);
  //
  // Make character walk forward
  TaskGoStraightToCoord(
    Game.PlayerPed.Handle,
    WalkToOffset.x,
    WalkToOffset.y,
    WalkToOffset.z,
    1.3,
    -1,
    SpawnHeading,
    0
  );

  SetPedKeepTask(Game.PlayerPed.Handle, true);

  Game.Player.PvPEnabled = true;

  Chat(`${chosenMsg} ${Game.Player.Name}`);
};

const setupSpawner = () => {
  globalThis.exports.spawnmanager.setAutoSpawnCallback(() => {
    const pedModel = RandomPedModel();

    globalThis.exports.spawnmanager.spawnPlayer(
      {
        ...SpawnOpts,
        heading: SpawnHeading,
        model: pedModel
      },
      onSpawn
    );
  });

  globalThis.exports.spawnmanager.setAutoSpawn(true);
  // globalThis.exports.spawnmanager.forceRespawn();
};

export const bootstrapGameType = async () => {
  setupSpawner();
  RegisterWhatAmI();

  console.log('[Sandbox] Mod Started:', new Date());
};
