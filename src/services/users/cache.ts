
import { useEntityFilter } from "@/hooks/entity/useEntityFilter";
import { getUsersWithRole } from "./users";

 const { data  } = useEntityFilter({
    entityName: "users-role",
    fetchFn: getUsersWithRole ,
    sort: {
      key: "nom",
      order: "asc"
    }
  });