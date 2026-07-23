import { expect, test } from '@playwright/test'

test('completes the default Revise control workflow', async ({ page }) => {
  await page.goto('/control-lite/')

  await page.getByRole('button', { name: 'Generate controlled instruction' }).click()
  await expect(page.locator('#instruction-preview')).toHaveValue(/# Atlas-controlled AI instruction/)

  await page.getByRole('button', { name: 'Inspect a proposed change' }).click()
  await expect(page.locator('#scope-summary')).toContainText('inside the allowlist')

  await page.getByRole('button', { name: 'Record evidence' }).click()
  await expect(page.locator('.evidence-row')).toHaveCount(3)

  await page.getByRole('button', { name: 'Make the human decision' }).click()
  await expect(page.locator('#decision-guidance')).toContainText('Revise aligns')

  await page.getByRole('button', { name: 'Build review record' }).click()
  await expect(page.locator('#combined-record')).toHaveValue(/# Atlas Controlled Change Record/)
  await expect(page.locator('#combined-record')).toHaveValue(/\*\*Decision:\*\* Revise/)
  await expect(page.locator('.artifact')).toHaveCount(4)
  await expect(page.locator('#compendium-link')).toHaveAttribute('href', /CANON-LARAVEL-REQUEST-LIFECYCLE-001/)
})

test('flags the supplied out-of-scope dependency in the Reject example', async ({ page }) => {
  await page.goto('/control-lite/')
  await page.locator('#scenario').selectOption('reject')
  await page.getByRole('button', { name: 'Load example' }).click()
  await page.getByRole('button', { name: 'Generate controlled instruction' }).click()
  await page.getByRole('button', { name: 'Inspect a proposed change' }).click()

  await expect(page.locator('#scope-summary')).toContainText('out-of-scope path')
  await expect(page.locator('#scope-summary')).toContainText('package.json')
})

test('keeps HTML-like user input as textarea text', async ({ page }) => {
  await page.goto('/control-lite/')
  const unsafeLookingText = `<img src=x onerror="alert('test')">`
  await page.locator('#goal').fill(unsafeLookingText)

  let dialogOpened = false
  page.on('dialog', async (dialog) => {
    dialogOpened = true
    await dialog.dismiss()
  })

  await page.getByRole('button', { name: 'Generate controlled instruction' }).click()
  await expect(page.locator('#instruction-preview')).toHaveValue(new RegExp(unsafeLookingText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  await expect(page.locator('img[src="x"]')).toHaveCount(0)
  expect(dialogOpened).toBe(false)
})
