import { Additive as IAdditive } from '@/common'
import { Model, Schema, model } from 'mongoose'

function escapeRegExp(str: string) {
	return new RegExp(str.replace(/[.*+?^${}()|[\]]/g, '\\$&'), 'i') // $& means the whole matched string
}

async function includes(query: string) {
	return (
		await Additive.find().or([
			{ code: { $regex: escapeRegExp(query) } },
			{ name: { $regex: escapeRegExp(query) } }
		])
	).map(doc => doc.toObject())
}

interface AdditiveModel extends Model<IAdditive> {
	includes(query: string): ReturnType<typeof includes>
}

const additiveSchema = new Schema<IAdditive, AdditiveModel>({
	code: String,
	name: String,
	danger: {
		level: Number,
		reasons: [String]
	},
	origins: [String]
})

additiveSchema.static('includes', includes)


export const Additive = model<IAdditive, AdditiveModel>(
	'Additive',
	additiveSchema
)
