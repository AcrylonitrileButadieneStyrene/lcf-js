// Automatically generated file, do not edit (changes made will be overwritten).
// Created by <lcf-js>/rust/src/main.rs on 2025-10-23 17:03:31.334941221 UTC.

export enum AnimationType {
	Standing = 0,
	Walking = 1,
	DirectionFixInanimated = 2,
	DirectionFixAnimated = 3,
	FixedGraphic = 4,
	Spin = 5,
}

export interface BGM {
	file: number[];
	fade_in_time: number;
	volume: number;
	tempo: number;
	balance: number;
}

export interface Command {
	indent: number;
	string: number[];
	instruction: Instruction;
}

export interface Condition {
	switch_a: [boolean, number];
	switch_b: [boolean, number];
	variable: [boolean, number];
	value: number;
	item: [boolean, number];
	actor: [boolean, number];
	timer: [boolean, number];
}

export enum Direction {
	Up = 0,
	Left = 1,
	Right = 2,
	Down = 3,
}

export interface Event {
	id: number;
	name: number[];
	x: number;
	y: number;
	pages: EventPage[];
}

export interface EventPage {
	condition: Condition;
	graphic: Graphic;
	movement: Movement;
	trigger: Trigger;
	priority: Priority;
	forbid_event_overlap: boolean;
	animation_type: AnimationType;
	commands: Command[];
}

export interface Graphic {
	file: number[];
	index: number;
	direction: Direction;
	pattern: number;
	transparent: boolean;
}

export type Instruction =
	| "End"
	| "ExitGame"
	| "ShowMessage"
	| { "MessageOptions": { opacity: number, position: number, avoid_covering_player: number, allow_event_processing: number } }
	| { "ChangeFaceset": { pattern: number, display_position: number, flip_horizontally: number } }
	| { "ShowChoice": { cancel_option: number } }
	| { "InputNumber": { digits: number, variable: number } }
	| { "ControlSwitches": { mode: number, start: number, end: number, operation: number } }
	| { "ControlVariables": { mode: number, start: number, end: number, operation: number, operand: number, value1: number, value2: number } }
	| { "ControlTimer": { operation: number, operand: number, seconds: number, show_timer: number, continue_in_battles: number } }
	| { "ChangeGold": { operation: number, operand: number, value: number } }
	| { "ChangeItems": { operation: number, item_target: number, item: number, operand: number, value: number } }
	| { "ChangePartyMembers": { operation: number, operand: number, actor: number } }
	| { "ChangeLevel": { actor_operand: number, actor: number, operation: number, operand: number, value: number, show_level_up_message: number } }
	| { "ChangeParameters": { actor_operand: number, actor: number, operation: number, parameter: number, operand: number, value: number } }
	| { "ChangeSkills": { actor_operand: number, actor: number, operation: number, operand: number, value: number } }
	| { "ChangeEquipment": { actor_operand: number, actor: number, operation: number, operand_or_type: number, value: number } }
	| { "RecoverAll": { operand: number, value: number } }
	| { "ChangeActorName": { actor: number } }
	| { "ChangeActorNickname": { actor: number } }
	| { "ChangeActorGraphic": { actor: number, pattern: number, transparent: number } }
	| { "ChangeActorFaceset": { actor: number, pattern: number } }
	| { "ChangeSystemSE": { type: number, volume: number, temp: number, balance: number } }
	| { "ChangeSystemGraphics": { window_background: number, font: number } }
	| { "ChangeScreenTransitions": { mode: number, value: number } }
	| { "OpenShop": { args: number[] } }
	| { "NameInputProcessing": { actor: number, mode: number, show_default_name: number } }
	| { "TransferPlayer": { map: number, x: number, y: number, direction: number | undefined } }
	| { "GetPlayerLocation": { output_map: number, output_x: number, output_y: number } }
	| { "MoveToVariableLocation": { map_variable: number, x_variable: number, y_variable: number } }
	| "GetOnOffVehicle"
	| { "SetVehicleLocation": { vehicle: number, operand: number, map: number, x: number, y: number } }
	| { "SetEventLocation": { source: number, mode: number, x_pos: number, y_pos: number, direction: number | undefined } }
	| { "SwapEventLocation": { left: number, right: number } }
	| { "StoreTerrainID": { operand: number, x: number, y: number, output: number } }
	| { "GetEventLocation": { mode: number, x: number, y: number, output: number } }
	| { "HideScreen": { mode: number } }
	| { "ShowScreen": { mode: number } }
	| { "TintScreen": { red: number, green: number, blue: number, saturation: number, deciseconds: number, wait_for_completion: number } }
	| { "FlashScreen": { red: number, green: number, blue: number, value: number, deciseconds: number, wait_for_completion: number, mode: number | undefined } }
	| { "ShakeScreen": { power: number, speed: number, deciseconds: number, wait_for_completion: number, mode: number | undefined } }
	| { "ScrollMap": { mode: number, direction: number, distance: number, speed: number, wait_for_completion: number } }
	| { "WeatherEffects": { type: number, power: number } }
	| { "ShowPicture": { args: number[] } }
	| { "MovePicture": { args: number[] } }
	| { "ErasePicture": { args: number[] } }
	| { "ShowAnimation": { animation: number, character: number, wait_for_completion: number, show_entire_map: number } }
	| { "ShowHidePlayer": { state: number } }
	| { "FlashEvent": { target: number, red: number, green: number, blue: number, value: number, time: number, wait_for_completion: number } }
	| { "MoveEvent": { target: number, frequency: number, rest: number[] } }
	| "WaitForAllMovement"
	| "HaltAllMovement"
	| { "Wait": { deciseconds: number, unknown: number | undefined } }
	| { "PlayBGM": { fade_in: number, volume: number, tempo: number, balance: number } }
	| { "FadeOutBGM": { seconds: number } }
	| "MemorizeCurrentBGM"
	| "PlayMemorizedBGM"
	| { "PlaySoundEffect": { volume: number, tempo: number, balance: number } }
	| { "PlayMovie": { width: number, height: number, operand: number, x: number, y: number } }
	| { "KeyInputProcessing": { args: number[] } }
	| { "ChangeMapTileset": { tileset: number } }
	| { "ChangeParallaxBackground": { horizontal_loop: number, horizontal_auto_scroll: number, horizontal_auto_scroll_speed: number, vertical_loop: number, vertical_auto_scroll: number, vertical_auto_scroll_speed: number } }
	| { "ChangeTile": { is_upper: number, from: number, to: number } }
	| { "SetTeleportPoint": { operation: number, map: number, x: number, y: number, switch_enabled: number, switch: number } }
	| { "SetEscapeLocation": { map: number, x: number, y: number, switch_enabled: number, switch: number } }
	| { "ChangeEscapeAccess": { enabled: number } }
	| "OpenSaveMenu"
	| { "ChangeSaveAccess": { state: number } }
	| "OpenMainMenu"
	| { "ChangeMenuAccess": { enabled: number } }
	| { "ConditionalBranch": { mode: number, field1: number, field2: number, field3: number, field4: number, has_else: number } }
	| { "Label": { value: number } }
	| { "JumpToLabel": { value: number } }
	| "Loop"
	| "BreakLoop"
	| "EndEventProcessing"
	| "EraseEvent"
	| { "CallEvent": { mode: number, index: number, page: number } }
	| "Comment"
	| "GameOver"
	| "ReturnToTitleScreen"
	| "ShowMessageNextLine"
	| { "ShowChoiceOption": { index: number } }
	| "ShowChoiceEnd"
	| "ElseBranch"
	| "EndBranch"
	| "EndLoop"
	| "CommentNextLine"
	| { "Unknown": { opcode: number, args: number[] } }

export type Lcf =
	| { "DataBase": LcfDataBase }
	| { "MapTree": LcfMapTree }
	| { "MapUnit": LcfMapUnit }
	| { "SaveData": LcfSaveData }

export interface LcfDataBase {
	
}

export interface LcfMapTree {
	active: number;
	start: Start;
	maps: [number, Map][];
}

export interface LcfMapUnit {
	chipset: number | undefined;
	width: number;
	height: number;
	scroll_type: ScrollType;
	panorama: Panorama;
	lower: number[];
	upper: number[];
	events: Event[];
	save_time: number;
}

export interface LcfSaveData {
	
}

export interface Map {
	name: number[];
	parent: number;
	indentation: number;
	type: MapType;
	horizontal_scroll_bar: number;
	vertical_scroll_bar: number;
	expanded: boolean;
	bgm: Setting;
	bgm_data: BGM;
	background: Setting;
	background_file: number[];
	teleport: Setting;
	escape: Setting;
	save: Setting;
	enemies: number[];
	encounter_rate: number;
}

export type MapType =
	| "Game"
	| "Map"
	| { "Area": { begin_x: number, begin_y: number, end_x: number, end_y: number } }

export interface MoveRoute {
	commands: number[];
	repeat: boolean;
	skippable: boolean;
}

export interface Movement {
	type: number;
	frequency: number;
	speed: number;
	route: MoveRoute;
}

export interface Panorama {
	enabled: boolean;
	file: number[] | undefined;
	horizontal_loop: boolean;
	vertical_loop: boolean;
	horizontal_auto_scroll: boolean;
	horizontal_auto_scroll_speed: number;
	vertical_auto_scroll: boolean;
	vertical_auto_scroll_speed: number;
}

export interface Position {
	map: number;
	x: number;
	y: number;
}

export enum Priority {
	BelowCharacters = 0,
	SameAsCharacters = 1,
	AboveCharacters = 2,
}

export enum ScrollType {
	None = 0,
	Vertical = 1,
	Horizontal = 2,
	Both = 3,
}

export enum Setting {
	Inherit = 0,
	SetByEvent = 1,
	Specified = 2,
}

export enum Speed {
	Eighth = 0,
	Fourth = 1,
	Half = 2,
	Normal = 3,
	Double = 4,
	Quadruple = 5,
}

export interface Start {
	party: Position | undefined;
	boat: Position | undefined;
	ship: Position | undefined;
	airship: Position | undefined;
}

export enum Trigger {
	ActionButton = 0,
	PlayerTouch = 1,
	EventTouch = 2,
	Autorun = 3,
	Parallel = 4,
}
