import DataManager from './DataManager'
import sampleData from './sample.json'

describe('DataManagerクラスのテスト', () => {
  let dataManager: DataManager;
  const data: any = sampleData;

  beforeEach(() => {
    dataManager = new DataManager(data)
  });

  test('データの取得に成功', () => {
    const actualData = dataManager.get();
    expect(actualData.length).toBe(data.length);
    expect(actualData[0]).toBe(data[0])
  });

  test('フィールドの値リストの取得に成功', () => {
    const valueList = dataManager.getFieldValueCandidates('居住都道府県');
    expect(valueList).toContain('東京都');
    expect(valueList).toContain('大阪府')
  });

  test('データのフィルタに成功', () => {
    dataManager.filter('居住都道府県', '東京都').filter('性別', '男性');

    expect(dataManager.get().length).toBeLessThan(data.length);

    const residences = dataManager.getFieldValueCandidates('居住都道府県');
    expect(residences.length).toBe(1);
    expect(residences).toContain('東京都');

    const genders = dataManager.getFieldValueCandidates('性別');
    expect(genders.length).toBe(1);
    expect(genders).toContain('男性')
  });

  test('カウント取得に成功', () => {
    const counts: any = dataManager.countFieldValues('ステータス');
    const statuses = Object.keys(counts);

    expect(statuses).toContain('退院');
    dataManager.getFieldValueCandidates('ステータス').forEach(status => {
      expect(statuses).toContain(status)
    });

    statuses.forEach(status => {
      expect(typeof counts[status]).toBe('number');
      expect(counts[status]).toBeGreaterThan(0);
      expect(counts[status]).toBeLessThanOrEqual(data.length)
    })
  });

  test('フィルタリセットに成功', () => {
    dataManager.filter('居住都道府県', '東京都').filter('性別', '男性');

    expect(dataManager.get().length).toBeLessThan(data.length);

    dataManager.reset();
    expect(dataManager.get().length).toBe(data.length)
  })
});
