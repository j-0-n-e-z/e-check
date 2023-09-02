import { Model, Schema, model } from 'mongoose'

interface Additive {
	code: string
	name: string
	danger: number
	origins: string[]
}

interface AdditiveModel extends Model<Additive> {
	includes(query: string): ReturnType<typeof includes>
}

const additiveSchema = new Schema<Additive, AdditiveModel>({
	code: String,
	name: String,
	danger: Number,
	origins: [String]
})

additiveSchema.static('includes', includes)

export const Additive = model<Additive, AdditiveModel>(
	'Additive',
	additiveSchema
)

async function includes(query: string) {
	return (
		await Additive.find().or([
			{ code: { $regex: escapeRegExp(query) } },
			{ name: { $regex: escapeRegExp(query) } }
		])
	).map(doc => doc.toObject())
}

function escapeRegExp(str: string) {
	return str.replace(/[.*+?^${}()|[\]]/g, '\\$&') // $& means the whole matched string
}
