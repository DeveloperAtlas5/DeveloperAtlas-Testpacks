import { expect, test } from '@playwright/test'

test('generates four reviewable Atlas artifacts locally', async ({ page }) => {
  await page.goto('/control-lite/')
  await page.getByRole('button', { name: 'Generate Atlas artifacts' }).click()

  const artifact = page.locator('.artifact')
  await expect(artifact).toHaveCount(4)
  await expect(artifact.nth(0).locator('textarea')).toContainText('# Atlas Change Contract')
  await expect(artifact.nth(1).locator('textarea')).toContainText('Report every check as Passed, Failed, or Not run')
  await expect(artifact.nth(2).locator('textarea')).toContainText('**Not run**')
  await expect(artifact.nth(3).locator('textarea')).toContainText('- [ ] Accept')
})

test('renders user-entered content as text inside generated markdown', async ({ page }) => {
  await page.goto('/control-lite/')
  const hostile = `<img src=x onerror="alert('test')">`
  await page.locator('#goal').fill(hostile)

  let dialogOpened = false
  page.on('dialog', async (dialog) => {
    dialogOpened = true
    await dialog.dismiss()
  })

  await page.getByRole('button', { name: 'Generate Atlas artifacts' }).click()
  await expect(page.locator('.artifact').first().locator('textarea')).toContainText(hostile)
  await expect(page.locator('.artifact img')).toHaveCount(0)
  expect(dialogOpened).toBe(false)
})
