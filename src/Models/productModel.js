import joi from "joi";

const productSchema = joi.object({
    name:joi.string().min(2).required(),
    image:joi.string().required(),
    value:joi.number().required(),
    description:joi.string().required(),
    category:joi.string().required(),
    subCategory:joi.string()
})

export default productSchema