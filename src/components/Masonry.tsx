import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MasonryItem {
    id: number;
    image: string;
    height: number;
}

interface MasonryProps {
    items: MasonryItem[];
    columnCount?: number;
    gap?: number;
}

const Masonry = ({ items, columnCount = 3, gap = 16 }: MasonryProps) => {
    const [columns, setColumns] = useState<MasonryItem[][]>([]);

    // Distribute items across columns based on height
    useEffect(() => {
        const newColumns: MasonryItem[][] = Array.from({ length: columnCount }, () => []);
        const columnHeights = new Array(columnCount).fill(0);

        items.forEach((item) => {
            // Find the shortest column
            const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
            newColumns[shortestColumn].push(item);
            columnHeights[shortestColumn] += item.height;
        });

        setColumns(newColumns);
    }, [items, columnCount]);

    return (
        <div
            className="masonry-container"
            style={{
                display: 'flex',
                gap: `${gap}px`,
                width: '100%',
                justifyContent: 'center',
            }}
        >
            {columns.map((column, columnIndex) => (
                <div
                    key={columnIndex}
                    className="masonry-column"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: `${gap}px`,
                        flex: 1,
                        maxWidth: `${100 / columnCount}%`,
                    }}
                >
                    <AnimatePresence>
                        {column.map((item, itemIndex) => (
                            <motion.div
                                key={item.id}
                                className="masonry-item group cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{
                                    duration: 0.5,
                                    delay: (columnIndex * column.length + itemIndex) * 0.05,
                                }}
                                whileHover={{ scale: 1.02, zIndex: 10 }}
                                style={{
                                    height: `${item.height}px`,
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    position: 'relative',
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={`Memory ${item.id}`}
                                    loading="lazy"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s ease',
                                    }}
                                    className="group-hover:scale-110"
                                />
                                {/* Overlay on hover */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-pink-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />
                                {/* Heart icon on hover */}
                                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-2xl drop-shadow-lg">💕</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

export default Masonry;
