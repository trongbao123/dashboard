import dynamic, { DynamicOptions } from 'next/dynamic'
import type { ComponentType, ComponentProps } from 'react'
import { memo } from 'react'

interface WithDynamicOptions<T> extends Omit<DynamicOptions<T>, 'loadableGenerated'> {}

export function withDynamic<
  TModule extends Record<string, any>,
  TExportKey extends keyof TModule = keyof TModule,
  TProps = ComponentProps<TModule[TExportKey]>,
>(loader: () => Promise<TModule>, exportName: TExportKey, options?: WithDynamicOptions<TProps>) {
  const DynamicComponent = dynamic<TProps>(
    async () => {
      const mod = await loader()
      const component = mod[exportName]

      if (!component) {
        throw new Error(`Export "${String(exportName)}" not found in dynamic module.`)
      }

      return component as unknown as ComponentType<TProps>
    },
    {
      ...options,
    }
  )

  return memo(DynamicComponent) as ComponentType<TProps>
}
