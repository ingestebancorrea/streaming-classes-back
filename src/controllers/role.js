const errorMessages = require("../common/errorMessage");
const Role = require("../models/Role");

const getRoleByAlias = async(alias) => {
    try{
        const role = await Role.findOne({
            where: { alias },
            attributes: ['id']
        });

        console.log("role",role);

        if (!role) {
            throw new Error('Role not found');
        }

        return role.dataValues.id;
    }catch(error){
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: errorMessages.SERVER.GENERAL_ERROR,
        });
    }
}

module.exports = { getRoleByAlias };