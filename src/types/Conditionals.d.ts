import { FormSelectWithPopoverProps } from 'components/optimizerTab/conditionals/FormSelect'
import { FormSliderWithPopoverProps } from 'components/optimizerTab/conditionals/FormSlider'
import { FormSwitchWithPopoverProps } from 'components/optimizerTab/conditionals/FormSwitch'
import { ComputedStatsObject } from 'lib/conditionals/conditionalConstants.ts'
import { DynamicConditional } from 'lib/gpu/conditionals/dynamicConditionals'
import { ComponentProps, ComponentType } from 'react'
import { OptimizerAction, OptimizerContext } from 'types/Optimizer'

export type ConditionalMap = {
  [key: string]: number | boolean | string | undefined
}

// interface to an instance of a Character or Light Cone conditional controller
export interface Conditional {
  // Visual elements for conditionals
  // Content defines the form UI components and their related conditional variables
  content: () => ContentItem[]
  teammateContent?: () => ContentItem[]
  defaults: () => ConditionalMap
  teammateDefaults?: () => ConditionalMap

  // Configuration changes to the character & combat environment executed before the precompute steps
  // This can include things like ability damage type switches, weakness break overrides, etc
  initializeConfigurations?: (x: ComputedStatsObject, action: OptimizerAction, context: OptimizerContext) => void
  initializeTeammateConfigurations?: (x: ComputedStatsObject, action: OptimizerAction, context: OptimizerContext) => void

  // Individual effects that apply only for the primary character
  // e.g. Self buffs
  precomputeEffects: (x: ComputedStatsObject, action: OptimizerAction, context: OptimizerContext) => void

  // Shared effects that apply both as a teammate and as the primary character
  // e.g. AOE team buff
  precomputeMutualEffects?: (x: ComputedStatsObject, action: OptimizerAction, context: OptimizerContext) => void

  // DEPRECATE
  postPreComputeMutualEffects?: (x: ComputedStatsObject, action: OptimizerAction, context: OptimizerContext) => void

  // Effects that only apply as a teammate, onto the primary character
  // e.g. Targeted teammate buff
  precomputeTeammateEffects?: (x: ComputedStatsObject, action: OptimizerAction, context: OptimizerContext) => void

  // Multipliers that can be evaluated after all stat modifications are complete
  // No changes to stats should occur at this stage
  finalizeCalculations: (x: ComputedStatsObject, action: OptimizerAction, context: OptimizerContext) => void

  // WGSL implementation of finalizeCalculations to run on GPU
  gpuFinalizeCalculations?: (action: OptimizerAction, context: OptimizerContext) => string

  // Dynamic conditionals are ones that cannot be precomputed, and can trigger at any point in the compute pipeline
  // These are dependent on other stats, usually in the form of 'when x.stat >= value, then buff x.other' and will
  // evaluate each time that dependent stat changes. These are executed after the precomputes, but before finalizing.
  dynamicConditionals?: DynamicConditional[]

  teammateDynamicConditionals?: DynamicConditional[]
}

export type ContentComponentMap = {
  switch: ComponentType<FormSwitchWithPopoverProps>
  slider: ComponentType<FormSliderWithPopoverProps>
  select: ComponentType<FormSelectWithPopoverProps>
}

// extracted content to apply to <DisplayFormControl />
export type ContentItem = {
  [K in keyof ContentComponentMap]: {
    formItem: K
    id: string
    content: string
    teammateIndex?: number
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
  | 'e2AtkBoost'
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
  | 'ehrToDmgBoost'
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
  | 'fireDmgBoost'
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
  | 'talentDefShredDebuff'
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
  | 'teamBEBuff'
  | 'teamDmgBuff'
  | 'teamSpdBuff'
  | 'teamImaginaryDmgBoost'
  | 'teammateAtkBuffValue'
  | 'teammateATKValue'
  | 'teammateCDValue'
  | 'teammateHPValue'
  | 'teammateDEFValue'
  | 'teammateSPDValue'
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
  | 'e2TeamDotBoost'
  | 'teamEhrBuff'
  | 'skillWeaknessResShredDebuff'
  | 'talentActive'
  | 'e4TeamResBuff'
  | 'beToDmgBoost'
  | 'errBuffActive'
  | 'crimsonKnotStacks'
  | 'nihilityTeammates'
  | 'thunderCoreStacks'
  | 'e4UltVulnerability'
  | 'e1EnemyDebuffed'
  | 'fortifiedWagerBuff'
  | 'enemyUnnervedDebuff'
  | 'e2ResShred'
  | 'e4DefBuff'
  | 'e6ShieldStacks'
  | 'breakEffectToOhbBoost'
  | 'e1ResBuff'
  | 'e6BeBuff'
  | 'targetVulnerability'
  | 'shieldCdBuff'
  | 'emptyBubblesDebuff'
  | 'teammateShieldStacks'
  | 'e6UltBuffs'
  | 'fuaHitsOnTarget'
  | 'defToCrBoost'
  | 'e2ResBuff'
  | 'e1EnemyHp80CrBoost'
  | 'standoffActive'
  | 'e1DefShred'
  | 'e2BeBuff'
  | 'e4TargetStandoffVulnerability'
  | 'beToCritBoost'
  | 'pocketTrickshotStacks'
  | 'talentBreakDmg'
  | 'e1UltScalingBoost'
  | 'e6UltCdBoost'
  | 'e6ResShredBuff'
  | 'ultAtkBuff'
  | 'e1OrnamentStacks'
  | 'talentFuaCdBoost'
  | 'concertoActive'
  | 'skillHitsOnTarget'
  | 'e2EnergyRegenBuff'
  | 'teammateBeValue'
  | 'talentCdBuff'
  | 'e6Buffs'
  | 'enemyDefReducedSlowed'
  | 'vulnerabilityStacks'
  | 'cadenzaActive'
  | 'cantillationStacks'
  | 'stygianResurgeHitsOnTarget'
  | 'targetBesotted'
  | 'e1EnemyHp50'
  | 'enemyHp50'
  | 'e2EnemyHp50DmgBoost'
  | 'enemyHpLte50'
  | 'enemyHpGte50'
  | 'talentMaxToughnessReduction'
  | 'skillOvertoneBuff'
  | 'talentBreakDmgScaling'
  | 'e1UltResPenStacks'
  | 'e6UltCDBoost'
  | 'backupDancer'
  | 'e6AdditionalBreakDmg'
  | 'spdBuffConditional'
  | 'breakDmgDefShred'
  | 'e1UltResPen'
  | 'e2UltSpdBuff'
  | 'traceFuaCdBoost'
  | 'atkToBeConversion'
  | 'enhancedStateSpdBuff'
  | 'enhancedFollowUp'
  | 'debtCollectorSpdBuff'
  | 'pawnedAssetStacks'
  | 'e1FuaDmgBoost'
  | 'e2CrBuff'
  | 'e4DefShredBuff'
  | 'crushedVulnerability'
  | 'spdBuff'
  | 'sValuesFuaDmg'
  | 'ultFuaDefShred'
  | 'atkBuff'
  | 'ultFuaCdBoost'
  | 'superBreakDmg'
  | 'routedVulnerability'
  | 'fuaStacks'
  | 'skillDot'
  | 'e1EffectResShred'
  | 'e4ResBuff'
  | 'superBreakEnabled'
  | 'ultCdBoost'
  | 'cdBuff'
  | 'fuaDmgStacks'
  | 'unarmoredVulnerability'
  | 'corneredVulnerability'
  | 'ashenRoastStacks'
  | 'ehrToAtkBoost'
  | 'e1DmgBoost'
  | 'e2Dot'
  | 'e6ResShred'
  | 'masterBuff'
  | 'basicAttackHits'
  | 'talentDmgBuff'
  | 'selfSpdBuff'
  | 'e1EnhancedBasicCdBuff'
  | 'e6MasterBuffs'
  | 'skillSpdScaling'
  | 'counterAtkBuff'
  | 'blockActive'
  | 'e1UltBuff'
  | 'ultCull'
  | 'ultCullHits'
  | 'e4DefShred'
  | 'masterToughnessRedBuff'
  | 'masterAdditionalDmgBuff'
  | 'e2DefShred'
  | 'masterCdBeBuffs'
  | 'e6CdBuff'
  | 'weaknessBrokenUlt'
  | 'ultStacks'
  | 'e1UltDmg'
  | 'e4DmgTypeChange'
  | 'beConversion'
  | 'befogState'
  | 'preyMark'
  | 'e1Buffs'
  | 'e4CdBoost'
  | 'luminfluxStacks'
  | 'woefreeState'
  | 'additionalVulnerability'
  | 'e1UltHitsOnTarget'
  | 'skillAtkBuff'
  | 'e1OriginalDmgBoost'
  | 'e4FuaVulnerability'
  | 'e4DmgBuff'
  | 'e2CdBoost'
  | 'e6MultiplierIncrease'
  | 'luminfluxUltStacks'
  | 'e4Buffs'
  | 'sealformActive'
  | 'atkToBreakVulnerability'
  | 'e1DefPen'
  | 'e2Buffs'
  | 'e4SpdBuff'
  | 'teammateBreakVulnerability'
  | 'chargeStacks'
  | 'foxianPrayer'
  | 'e4Vulnerability'
  | 'e6BreakEfficiency'
  | 'enemyBrokenBeBuff'
  | 'defReduction'
  | 'e1ResPen'
  | 'e2SpdBuff'
  | 'e6CrStacks'
  | 'e6CrToCdConversion'
  | 'beatified'
  | 'talentCrBuffStacks'
  | 'skillDmgBuffSummon'
  | 'torridScorch'
  | 'weaknessBreakBeStacks'
  | 'dmgBuffStacks'
  | 'breakVulnerabilityStacks'
  | 'be250Buff'
  | 'e4BreakDmg'
  | 'techniqueDmgBuff'
