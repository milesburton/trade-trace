---
title: Contributing
description: Guidelines for contributing to Trade Trace
---

## Code of Conduct

Be respectful and professional. We're building a welcoming community.

## Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Follow our development standards
4. Submit a pull request

## Commit Message Format

We follow conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only
- **style**: Changes that don't affect code logic (formatting, missing semicolons)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding or updating tests
- **chore**: Changes to build process, dependencies, etc.

### Examples

```bash
git commit -m "feat(dashboard): add export functionality

Add ability to export review data to CSV format.
Implements #123."

git commit -m "fix(form): prevent double submission

Add loading state to submit button to prevent accidental
duplicate submissions."

git commit -m "docs(readme): update installation steps"

git commit -m "test(dashboard): add unit tests for statistics"
```

## Pull Request Process

### Before Submitting

1. Ensure code passes all checks:
   ```bash
   npm run lint:fix
   npm run typecheck
   npm run test
   ```

2. Create a clear PR title: `feat: add feature description`

3. Write a descriptive PR description explaining:
   - What changes were made
   - Why the changes were made
   - How to test the changes

### PR Template

```markdown
## Description
Brief description of changes.

## Related Issues
Fixes #123

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how to test your changes.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
```

## Code Style

### TypeScript

- Use strict mode (enabled by default)
- No implicit `any` types
- Use meaningful variable names
- Write self-documenting code

```typescript
// Good
function submitReview(data: ReviewData): Promise<Review> {
  return apiClient.submitReview(data)
}

// Bad
function submit(d: any): any {
  return api.submit(d)
}
```

### Components

- Use functional components with hooks
- Keep components focused and small
- Export from `components/index.ts`
- Add loading and error states

```typescript
// Good
export function ReviewForm() {
  const [formData, setFormData] = useState<ReviewData>({...})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Implementation
}

// Bad
export const ReviewForm = (props: any) => {
  // Unclear implementation
}
```

### Styling

- Use Tailwind CSS classes
- Support dark mode with `dark:` prefix
- Use semantic HTML
- Ensure accessibility

```tsx
// Good
<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
  Submit
</button>

// Bad
<button style={{backgroundColor: 'blue', color: 'white'}}>Submit</button>
```

## Testing

### Unit Tests

Write tests for components, utilities, and business logic:

```typescript
import { render, screen } from '@testing-library/react'
import { ReviewForm } from '../ReviewForm'

describe('ReviewForm', () => {
  it('renders form fields', () => {
    render(<ReviewForm />)
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
  })

  it('submits form data', async () => {
    render(<ReviewForm />)
    // Test submission
  })
})
```

### E2E Tests

Write tests for user workflows:

```typescript
import { test, expect } from '@playwright/test'

test('user can submit a review', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await page.click('text=Submit Review')
  // Fill form and submit
})
```

Run tests:

```bash
npm run test              # Unit tests
npm run test:ui           # E2E tests
npm run test:ui:headed    # E2E with browser
npm run test:coverage     # Coverage report
```

## Documentation

- Update README.md for user-facing changes
- Add/update component documentation
- Write clear commit messages
- Keep docs in sync with code

### Component Documentation

Add JSDoc comments:

```typescript
/**
 * Displays a list of tradesmen.
 *
 * @component
 * @example
 * return <TradesmenList />
 */
export function TradesmenList() {
  // Implementation
}
```

## Review Process

1. **Automated Checks**: GitHub Actions runs linting, tests, and builds
2. **Code Review**: A maintainer reviews your code
3. **Approval**: After approval, your PR is ready to merge
4. **Merge**: Use "Squash and merge" to keep history clean

## Common Issues

### Linting Errors

```bash
npm run lint:fix  # Auto-fix most issues
```

### TypeScript Errors

```bash
npm run typecheck
```

### Test Failures

```bash
npm run test:unit -- --ui  # Run tests in UI mode
```

## Questions?

- Check existing [issues](https://github.com/milesburton/trade-trace/issues)
- Ask on [Discord](https://discord.gg/tSGgsKnz)
- Read the [development guide](/development/getting-started)

## Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to Trade Trace! 🙏
