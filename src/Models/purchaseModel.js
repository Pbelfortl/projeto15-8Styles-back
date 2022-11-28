import joi from "joi";

const purchaseSchema = joi.object({
    name:joi.string().min(6).required(),
    CEP:joi.number().required(),
    paymentType:joi.valid("cartao", "pix", "boleto").required(),
    products:joi.object().required(),
    value:joi.number().required()
    
})

export default purchaseSchema