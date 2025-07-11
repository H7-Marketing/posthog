import { Card, Button, Space } from 'antd'
import { PropsWithChildren } from 'react'
import { CloseOutlined, CopyOutlined, ExpandOutlined } from '@ant-design/icons'

export interface WidgetShellProps extends PropsWithChildren {
    title: string
    onRemove?: () => void
    onClone?: () => void
    onExpand?: () => void
}

export function WidgetShell({ title, onRemove, onClone, onExpand, children }: WidgetShellProps): JSX.Element {
    return (
        <Card
            title={<span className="widget-drag-handle" style={{ cursor: 'move' }}>{title}</span>}
            extra={
                <Space>
                    {onClone && <Button icon={<CopyOutlined />} size="small" type="text" onClick={onClone} />}
                    {onExpand && <Button icon={<ExpandOutlined />} size="small" type="text" onClick={onExpand} />}
                    {onRemove && <Button icon={<CloseOutlined />} size="small" type="text" onClick={onRemove} />}
                </Space>
            }
            size="small"
        >
            {children}
        </Card>
    )
}
