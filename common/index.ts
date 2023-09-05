export interface Additive {
	_id: string
	code: string
	name: string
	danger: {
		level: number
		reasons: string[]
	}
	origins: Origin[]
}

export type Origin =
	| 'искусственное'
	| 'животное'
	| 'растительное'
	| 'синтетическое'
	| 'биологическое'
	| 'микробиологическое'
	| 'минеральное'
