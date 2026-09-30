import { ConversationTopic } from '../types/game';
import { SCENARIO_TOPICS_PART1 } from './scenarioTopicsPart1';
import { SCENARIO_TOPICS_PART2 } from './scenarioTopicsPart2';

export {
  OPENING_ASCH_TEXT,
  PHASE1_TOPIC_SLIP_CONFIGS,
} from './scenarioTopicsPart1';
export type {
  Phase1SlipType,
  Phase1SlipVariant,
  Phase1TopicSlipConfig,
} from './scenarioTopicsPart1';

export {
  INITIAL_MEMORY_SECTORS,
  INITIAL_SYSTEM_LOGS,
  ANGRY_COOLDOWN_REACTION,
  CONTEXT_IDLE_REACTIONS,
  IDLE_REACTIONS,
  RETURN_FROM_IDLE_LINES,
  AWKWARD_TOPIC_PREFIXES,
  SERIOUS_TO_BRIGHT_TRANSITIONS,
  TERMINAL_GAZE_REACTIONS,
  TERMINAL_UNREVEALED_REACTIONS,
  AWAY_RETURN_REACTIONS,
  DEFAULT_BAD_MOOD_REFUSAL_LINES,
  TURN_MILESTONE_QUESTIONS,
} from './scenarioSectors';

export {
  FINAL_ASCH_QUESTION_LINE,
  PHASE3_WHO_AM_I_OPTIONS,
  PHASE3_SILENT_TIMEOUT_OPTIONS,
  FINAL_DECISION_STAGES,
  ENDING_SCENARIOS,
  resolveEndingKey,
} from './scenarioEndingsAndSpecial';

export const CONVERSATION_TOPICS: ConversationTopic[] = [
  ...SCENARIO_TOPICS_PART1,
  ...SCENARIO_TOPICS_PART2,
];
