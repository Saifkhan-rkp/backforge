import validateProjectName from 'validate-npm-package-name'

type ValidateNpmNameResult =
    | {
        valid: false
        problems: string[]
    }
    | {
        valid: true
        problems: string[]
    }


export function validateNpmName(name: string): ValidateNpmNameResult {
    const nameValidation = validateProjectName(name)
    if (!nameValidation.validForNewPackages) {
        return {
            valid: false,
            problems: [
                ...(nameValidation.errors || []),
                ...(nameValidation.warnings || []),
            ],
        }
    }

    return { valid: true, problems: [] }
}