// This file was generated by the XState CLI, please do not edit it manually.
import { createMachine, sendTo } from 'xstate';

export const machine = createMachine(
  {
    id: 'Sleep',
    states: {
      Sound: {
        description: 'Sound is local to the user.',
        invoke: {
          src: 'audioPlayer',
          id: 'audioPlayer',
        },
        initial: 'Off',
        states: {
          Off: {
            entry: sendTo('audioPlayer', { type: 'pause' }),
            on: {
              'toggle sound': {
                target: 'On',
              },
            },
          },
          On: {
            entry: [
              sendTo('audioPlayer', { type: 'play' }),
              {
                type: 'randomAudio',
              },
            ],
            on: {
              'toggle sound': {
                target: 'Off',
              },
            },
          },
        },
      },
      Stars: {
        description: 'Stars are shared for all users.',
        initial: 'Idle',
        states: {
          Idle: {
            on: {
              'User joined': {
                target: 'Active session',
                actions: [
                  {
                    type: 'createSession',
                  },
                  {
                    type: 'addStar',
                  },
                ],
              },
            },
          },
          'Active session': {
            on: {
              'User left': {
                target: 'Idle',
                actions: [
                  {
                    type: 'removeStar',
                  },
                  {
                    type: 'endSession',
                  },
                ],
              },
            },
          },
        },
      },
    },
    type: 'parallel',
    types: {
      events: {} as
        | { type: 'User left' }
        | { type: 'User joined' }
        | { type: 'toggle sound' },
    },
  },
  {
    actions: {
      randomAudio: ({ context, event }) => {},

      createSession: ({ context, event }) => {},

      addStar: ({ context, event }) => {},

      removeStar: ({ context, event }) => {},

      endSession: ({ context, event }) => {},
    },
    actors: {
      audioPlayer: createMachine({
        /* ... */
      }),
    },
    guards: {},
    delays: {},
  },
);
export const skyConfig = {
  actorId: 'e9545148-f821-47cc-848d-df983510c886',
  machine,
};
