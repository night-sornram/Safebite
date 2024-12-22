interface Food {
  allergy: string[];
  suggestion: Suggestion;
  food: string;
  allergy_info: string[];
  warning: boolean;
}

interface Suggestion {
  menu: Array<{
    dish: string;
    price: string;
  }>;
  name: string;
}

interface HistoryProps {
  ID: string;
  picture: string;
  CreateAt: string;
  UpdateAt: string;
  DeleteAt: boolean;
  food_name: string;
  food_ingredients: string;
  alert_message: string;
  user_id: string;
  is_eatable: boolean;
  team_id: string;
}
