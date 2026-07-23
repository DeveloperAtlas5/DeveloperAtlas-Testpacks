import { expect, test } from '@playwright/test'

const url = '/control/exercises/browser-list-count/project/'

test('verified exercise updates the remaining count through the full lifecycle', async ({ page }) => {
  await page.goto(url)
  await expect(page.locator('.remaining-count')).toHaveText('0 items remaining')

  await page.locator('.item-input').fill('First task')
  await page.getByRole('button', { name: 'Add item' }).click()
  await expect(page.locator('.remaining-count')).toHaveText('1 item remaining')

  await page.getByRole('button', { name: 'Done' }).click()
  await expect(page.locator('.remaining-count')).toHaveText('0 items remaining')

  await page.getByRole('button', { name: 'Undo' }).click()
  await expect(page.locator('.remaining-count')).toHaveText('1 item remaining')

  await page.reload()
  await expect(page.locator('.remaining-count')).toHaveText('1 item remaining')

  await page.getByRole('button', { name: 'Remove' }).click()
  await expect(page.locator('.remaining-count')).toHaveText('0 items remaining')
})

test('verified exercise keeps HTML-like input literal', async ({ page }) => {
  await page.goto(url)
  const unsafeLookingText = '<img src=x onerror="alert(1)">'
  await page.locator('.item-input').fill(unsafeLookingText)
  await page.getByRole('button', { name: 'Add item' }).click()
  await expect(page.locator('.item-name')).toHaveText(unsafeLookingText)
  await expect(page.locator('.item-row img')).toHaveCount(0)
})
