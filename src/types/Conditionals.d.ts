import { Form } from 'types/Form'
import { ComputedStatsObject } from 'lib/conditionals/constants'
import { FormSwitchWithPopoverProps } from 'components/optimizerForm/conditionals/FormSwitch'
import { FormSliderWithPopoverProps } from 'components/optimizerForm/conditionals/FormSlider'
import { ComponentProps, ComponentType, ReactElement, ReactNode } from 'react'
import { ReplaceType } from './utils'

export type ConditionalMap = {
  [key: string]: number | boolean | string | undefined
}

// interface to an instance of a Character or Light Cone conditional controller
export interface Conditional {
  // getContent: () => { [key: string]: unknown }[];
  content: () => ContentItem[]
  defaults: () => ConditionalMap
  /*
   * TODO: purify this implmeentation
   * ComputedStatsObject arg is mutated by ref
   */
  calculateBaseMultis: (c: ComputedStatsObject, request: Form) => void
  calculatePassives?: () => void
}

export type ContentComponentMap = {
  switch: ComponentType<FormSwitchWithPopoverProps>
  slider: ComponentType<FormSliderWithPopoverProps>
}

// extracted content to apply to <DisplayFormControl />
export type ContentItem = {
  [K in keyof ContentComponentMap]: {
    formItem: K
    id: string
    content: string
  } & Omit<ComponentProps<ContentComponentMap[K]>, 'content'>
}[keyof ContentComponentMap]

export type ConditionalBuff =
  | 'activeShieldDmgDecrease'
  | 'alliesSameElement'
  | 'arcanaStacks'
  | 'atkBoostStacks'
  | 'atkBuffActive'
  | 'atkBuffStacks'
  | 'basicAtkBuff'
  | 'basicDmgBuff'
  | 'basicEnhanced'
  | 'basicEnhancedExtraHits'
  | 'basicEnhancedSpdBuff'
  | 'basicEnhancements'
  | 'basicSkillDmgBuff'
  | 'battleStartDefBuff'
  | 'benedictionBuff'
  | 'buffedState'
  | 'burdenAtkBuff'
  | 'cdBuffActive'
  | 'cipherBuff'
  | 'crBuff'
  | 'critBuff'
  | 'critSpdBuff'
  | 'debuffCdStacks'
  | 'debuffStacksDmgIncrease'
  | 'defDecreaseDebuff'
  | 'defeatedEnemyAtkBuff'
  | 'defeatedEnemyAtkStacks'
  | 'defeatedEnemyCdBuff'
  | 'defeatedEnemyCrBuff'
  | 'defeatedEnemySpdBuff'
  | 'dmgBoost'
  | 'dmgBuff'
  | 'dmgReductionBuff'
  | 'dmgResBuff'
  | 'dragonsCallStacks'
  | 'e1CdBuff'
  | 'e1DebtorStacks'
  | 'e1DotDmgReceivedDebuff'
  | 'e1EnhancedState'
  | 'e1ResReduction'
  | 'e1TalentSpdBuff'
  | 'e1TargetBleeding'
  | 'e1TargetFrozen'
  | 'e2BurnMultiBoost'
  | 'e2DefReduction'
  | 'e2DmgBuff'
  | 'e2DmgReductionBuff'
  | 'e2SkillDmgBuff'
  | 'e2SkillSpdBuff'
  | 'e2TalentCritStacks'
  | 'e2UltAtkBuff'
  | 'e2UltHealingBuff'
  | 'e4BeBuff'
  | 'e4CurrentHp80'
  | 'e4DmgReductionBuff'
  | 'e4MaxHpIncreaseStacks'
  | 'e4SkillHealingDmgBuffStacks'
  | 'e4SkillResShred'
  | 'e4TalentAtkBuff'
  | 'e4TalentStacks'
  | 'e6DefStacks'
  | 'e6DmgBuff'
  | 'e6FuaVulnerabilityStacks'
  | 'e6ResPenStacks'
  | 'e6ResReduction'
  | 'e6TeamHpLostPercent'
  | 'e6UltAtkBuff'
  | 'e6UltDmgBoost'
  | 'e6UltExtraHits'
  | 'e6UltTargetDebuff'
  | 'eclipseStacks'
  | 'enemies2CrBuff'
  | 'enemy3DebuffsCrBoost'
  | 'enemyBurned'
  | 'enemyBurnedBleeding'
  | 'enemyCountAtkBuff'
  | 'enemyDebuffed'
  | 'enemyDebuffedDmgBoost'
  | 'enemyDebuffStacks'
  | 'enemyDefeatedAtkBuff'
  | 'enemyDefeatedBuff'
  | 'enemyDmgTakenDebuff'
  | 'enemyFrozen'
  | 'enemyHp50Buff'
  | 'enemyHp50CrBoost'
  | 'enemyHp50FuaBuff'
  | 'enemyHpHigherDmgBoost'
  | 'enemyProofOfDebtDebuff'
  | 'enemyShockWindShear'
  | 'enemySlowed'
  | 'enemySlowedDmgBuff'
  | 'enemyToughness50'
  | 'enemyWeaknessBreakDmgBuff'
  | 'enhancedBasic'
  | 'enhancedSkill'
  | 'enhancedStateActive'
  | 'enhancedUlt'
  | 'epiphanyDebuff'
  | 'extraDmgProc'
  | 'fieldActive'
  | 'fuaDmgBoost'
  | 'fuaHits'
  | 'goodFortuneStacks'
  | 'healingBuff'
  | 'healingMaxHpBuff'
  | 'hp50DefBuff'
  | 'hpLostDmgBuff'
  | 'hpPercentLostTotal'
  | 'inBattleAtkBuff'
  | 'initialDmgReductionBuff'
  | 'initialEhrBuff'
  | 'initialSpdBuff'
  | 'initialSpeedBuff'
  | 'maskActive'
  | 'maxEnergyDmgBoost'
  | 'maxEnergyStacks'
  | 'maxEnergyUltDmgStacks'
  | 'maxStackDefPen'
  | 'missedCritCrBuff'
  | 'numbyEnhancedState'
  | 'postSkillDmgBuff'
  | 'postSkillHealBuff'
  | 'postSkillHealBuff'
  | 'postUltAtkBuff'
  | 'postUltBuff'
  | 'postUltDmgBuff'
  | 'postUltDotDmgBuff'
  | 'postUltHealingBoost'
  | 'postUltSpdBuff'
  | 'quantumAllies'
  | 'resToHealingBoost'
  | 'roaringBowstringsActive'
  | 'sameTargetHitStacks'
  | 'selfAttackedDefBuff'
  | 'selfCurrentHp80Percent'
  | 'selfCurrentHpPercent'
  | 'selfHp80CrBuff'
  | 'shieldActive'
  | 'skillActive'
  | 'skillBuff'
  | 'skillCdBuff'
  | 'skillCritBuff'
  | 'skillDefShredDebuff'
  | 'skillDmgBuff'
  | 'skillDmgIncreaseStacks'
  | 'skillExtraDmgHits'
  | 'skillExtraHits'
  | 'skillOutroarStacks'
  | 'skillRemovedBuff'
  | 'skillResShredDebuff'
  | 'skillSpdBuff'
  | 'skillTriggerStacks'
  | 'skillUltDmgBoost'
  | 'soulsteelBuffActive'
  | 'spdDmgBuff'
  | 'spdScalingBuffs'
  | 'spdStacks'
  | 'speedBoostStacks'
  | 'summationStacks'
  | 'talentAttacks'
  | 'talentBuffStacks'
  | 'talentDebuffStacks'
  | 'talentDmgReductionBuff'
  | 'talentEnemyMarked'
  | 'talentEnhancedState'
  | 'talentHitsPerAction'
  | 'talentHpDrainAtkBuff'
  | 'talentPenBuff'
  | 'talentRighteousHeartStacks'
  | 'talentSpdBuffStacks'
  | 'talentStacks'
  | 'targetBurdenActive'
  | 'targetBurned'
  | 'targetCodeDebuff'
  | 'targetDebuffs'
  | 'targetDotTakenDebuff'
  | 'targetEnsnared'
  | 'targetFrozen'
  | 'targetShocked'
  | 'targetTameStacks'
  | 'targetUltDebuffed'
  | 'targetWindShear'
  | 'techniqueBuff'
  | 'toughnessReductionDmgBoost'
  | 'trickStacks'
  | 'ultBuff'
  | 'ultBuffActive'
  | 'ultBuffedState'
  | 'ultDefPenDebuff'
  | 'ultDefShredDebuff'
  | 'ultDmgBuff'
  | 'ultEnhanced'
  | 'ultEnhancedExtraHits'
  | 'ultFieldActive'
  | 'ultHitsOnTarget'
  | 'ultSpdBuff'
  | 'weaknessBreakDmgBuff'
  | 'prophetStacks'