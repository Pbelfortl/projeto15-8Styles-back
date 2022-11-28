import joi from "joi";

const purchaseSchema = joi.object({
    name:joi.string().min(3).required(),
    CEP:joi.string().required(),
    paymentType:joi.valid("cartao", "pix", "boleto").required(),
    products:joi.array().required(),
    value:joi.number().required()
    
})

export default purchaseSchema