import { Card, Button } from 'antd'
import { ReactNode } from 'react'
import { CloseOutlined, CopyOutlined, ArrowsAltOutlined } from '@ant-design/icons'

interface Props {
    title: string
    onRemove?: () => void
    onClone?: () => void
    onExpand?: () => void
    children: ReactNode
}

export function WidgetShell({ title, onRemove, onClone, onExpand, children }: Props): JSX.Element {
    return (
        <Card
            title={<span className="widget-drag-handle" style={{ cursor: 'move' }}>{title}</span>}
            extra={
                <div style={{ display: 'flex', gap: 8 }}>
                    {onClone && <Button size="small" icon={<CopyOutlined />} onClick={onClone} />}
                    {onExpand && <Button size="small" icon={<ArrowsAltOutlined />} onClick={onExpand} />}
                    {onRemove && <Button size="small" danger icon={<CloseOutlined />} onClick={onRemove} />}
                </div>
            }
            bodyStyle={{ padding: 8 }}
        >
            {children}
        </Card>
    )
}
