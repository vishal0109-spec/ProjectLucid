import vine from "@vinejs/vine";

const vineSchema = vine.object({
  firstName: vine.string().minLength(5),
  lastName: vine.string(),
  email: vine.string().email().minLength(10),
  phone: vine.string(),
  password: vine.string().minLength(8).maxLength(32),
});

export default vineSchema;
