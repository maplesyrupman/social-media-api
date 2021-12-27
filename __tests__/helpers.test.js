const { formatDate } = require('../utils/helpers')

test('formats date to Jan 1, 2022', () => {
    const date = new Date(2022, 0, 1)
    const formatedDate = formatDate(date)

    expect(formatedDate).toBe('Jan 1, 2022')
})