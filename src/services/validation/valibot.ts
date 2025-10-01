import * as v from "valibot";


    const userSchema = v.object({
    name: v.pipe(v.string(), v.minLength(2, "Nom trop court")),
    age: v.pipe(v.number(), v.minValue(18, "Doit avoir au moins 18 ans")),
    email: v.pipe(v.string(), v.email("Email invalide")),
    bio: v.optional(v.string()),
    });
    
    
    const result = v.safeParse(userSchema, {
    name: "Auguste",
    age: 25,
    email: "test@example.com",
    });
    
    
    if (!result.success) {
    console.log("Erreurs :", result.issues.map(i => i.message));
    } else {
    console.log("Données valides :", result.output);
    }