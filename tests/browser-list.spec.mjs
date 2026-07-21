import { expect, test } from '@playwright/test'

const examplePath = '/examples/browser-list-starter/'

test.beforeEach(async ({ page }) => {
  await page.goto(examplePath)
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

test('adds, completes, persists, and removes one item', async ({ page }) => {
  await page.getByLabel('New item').fill('Learn Laravel routes')
  await page.getByRole('button', { name: 'Add item' }).click()

  const row = page.locator('.item-row')
  await expect(row).toHaveCount(1)
  await expect(row.locator('.item-name')).toHaveText('Learn Laravel routes')

  await row.getByRole('button', { name: 'Done' }).click()
  await expect(row).toHaveClass(/is-done/)
  await page.reload()
  await expect(page.locator('.item-row')).toHaveClass(/is-done/)

  await page.getByRole('button', { name: 'Remove' }).click()
  await expect(page.locator('.item-row')).toHaveCount(0)
  await page.reload()
  await expect(page.locator('.item-row')).toHaveCount(0)
})

test('renders HTML-like user input as plain text', async ({ page }) => {
  const unsafeLookingText = `<img src="invalid" onerror="alert('test')">`
  let dialogOpened = false
  page.on('dialog', async (dialog) => {
    dialogOpened = true
    await dialog.dismiss()
  })

  await page.getByLabel('New item').fill(unsafeLookingText)
  await page.getByRole('button', { name: 'Add item' }).click()

  await expect(page.locator('.item-name')).toHaveText(unsafeLookingText)
  await expect(page.locator('.item-row img')).toHaveCount(0)
  expect(dialogOpened).toBe(false)
})
