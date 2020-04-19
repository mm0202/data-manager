import * as _ from 'lodash'

export default class DataManager {
  protected readonly initialData: any;

  constructor(protected data: any) {
    this.initialData = _.cloneDeep(data)
  }

  isFiltered(): boolean {
    return this.data.length !== this.initialData.length
  }

  get(): any {
    return this.data
  }

  getFieldValueCandidates(key: string): any[] {
    return _.uniq(_.map(this.data, key))
  }

  filter(key: string, value: string): DataManager {
    this.data = _.filter(this.data, [key, value]);
    return this
  }

  filterByArray(key: string, values: string[]): DataManager {
    this.data = _.filter(this.data, (datum: any) => values.includes(datum[key]));
    return this
  }

  count() {
    return _.size(this.data)
  }

  countFieldValues(key: string): Object {
    const counts: any = {};
    this.data.forEach((datum: any) => {
      if (!counts[datum[key]]) {
        counts[datum[key]] = 0
      }
      counts[datum[key]]++
    });
    return counts
  }

  reset() {
    this.data = this.initialData
  }
}
