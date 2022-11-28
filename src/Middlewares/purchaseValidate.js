import purchaseSchema from "../Models/purchaseModel.js";

export function purchaseValidate(req, res, next) {
    const purchaseInformations = req.body


    const { error } = purchaseSchema.validate(purchaseInformations, { abortEarly: false});

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).send( {message: errors });
        }

    next()
}