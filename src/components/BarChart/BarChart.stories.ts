import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from './BarChart';
import { osMarketShare } from '@/data/osMarketShare';
import { players } from '@/data/players';
import { population } from '@/data/population';

const meta: Meta<typeof BarChart> = {
    title: 'Components/BarChart',
    component: BarChart,
    tags: ['autodocs'], // Optional: Generate documentation automatically
    parameters: {
        layout: 'centered', // Center the component in the Storybook canvas
    },
};

export default meta;

type StoryOSMarketShare = StoryObj<
    typeof BarChart<(typeof osMarketShare)[number]>
>;

// OS Market Share Story
export const OSMarketShare: StoryOSMarketShare = {
    args: {
        data: osMarketShare,
        getX: (item) => item.os,
        getY: (item) => item.share,
        labelX: 'OS',
        labelY: 'Market Share(%)',
    },
};

type StoryPopulation = StoryObj<typeof BarChart<(typeof population)[number]>>;

// Country Population
export const CountryPopulation: StoryPopulation = {
    args: {
        data: population,
        getX: (item) => item.country,
        getY: (item) => item.population,
        labelX: 'Country',
        labelY: 'Population',
    },
};

type StoryPlayers = StoryObj<typeof BarChart<(typeof players)[number]>>;

// Players runs
export const PlayerRuns: StoryPlayers = {
    args: {
        data: players,
        getX: (player) => player.name,
        getY: (player) => player.runs,
        labelX: 'Player Name',
        labelY: 'Player Runs',
    },
};

// Players matches
export const PlayerMatches: StoryPlayers = {
    args: {
        data: players,
        getX: (player) => player.name,
        getY: (player) => player.matches,
        labelX: 'Player Name',
        labelY: 'Player Matches',
    },
};

// Players fifties
export const PlayerFifties: StoryPlayers = {
    args: {
        data: players,
        getX: (player) => player.name,
        getY: (player) => player.fifties,
        labelX: 'Player Name',
        labelY: 'Player Fifties',
    },
};

// Players centuries
export const PlayerCenturies: StoryPlayers = {
    args: {
        data: players,
        getX: (player) => player.name,
        getY: (player) => player.centuries,
        labelX: 'Player Name',
        labelY: 'Player Centuries',
    },
};

// Players average
export const PlayerAverage: StoryPlayers = {
    args: {
        data: players,
        getX: (player) => player.name,
        getY: (player) => player.average,
        labelX: 'Player Name',
        labelY: 'Player Average',
    },
};
