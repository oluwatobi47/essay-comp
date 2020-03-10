import {Comparison} from "./comparison.model";
/**
 * Created by alao on 3/10/2020.
 */
export class ComparisonResult extends Comparison{
  similarity: number;
  matchingTexts: string[];
}


export const mockComparisonResult = {
  id: 1,
  similarity: 81,
  matchingTexts: ['Hello','today', 'day', 'day the lord has made', 'made'],
};

