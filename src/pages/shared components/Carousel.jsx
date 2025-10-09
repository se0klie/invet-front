import React, { useRef, useState, useEffect } from 'react';
import {
    Box,
    IconButton,
    useMediaQuery,
    useTheme,
    Typography
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, FiberManualRecord } from '@mui/icons-material';

export function ImageCarousel({ images, elementsToShow = 3 }) {
    const scrollRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const itemsPerPage = isMobile ? 1 : elementsToShow;
    const totalPages = Math.ceil(images.length / itemsPerPage);
    const [page, setPage] = useState(0);


    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollToPage = (pageIndex) => {
        const container = scrollRef.current;
        if (!container) return;
        const scrollWidth = container.scrollWidth / totalPages;
        container.scrollTo({
            left: scrollWidth * pageIndex,
            behavior: 'smooth',
        });
        setPage(pageIndex);
    };

    const handleArrow = (direction) => {
        let newPage = page + (direction === 'left' ? -1 : 1);
        newPage = Math.max(0, Math.min(newPage, totalPages - 1));
        scrollToPage(newPage);
    };

    useEffect(() => {
        const handleScroll = () => {
            const container = scrollRef.current;
            if (!container) return;
            const scrollLeft = container.scrollLeft;
            const scrollWidth = container.scrollWidth;
            const currentPage = Math.round(scrollLeft / (scrollWidth / totalPages));
            setPage(currentPage);
        };

        const container = scrollRef.current;
        container?.addEventListener('scroll', handleScroll);
        return () => container?.removeEventListener('scroll', handleScroll);
    }, [totalPages]);

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                }}
            >
                <IconButton
                    onClick={() => handleArrow('left')}
                    sx={{ color: 'black' }}
                    disabled={page === 0}
                >
                    <ArrowBackIos />
                </IconButton>

                <Box
                    ref={scrollRef}
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollSnapType: 'x mandatory',
                        scrollBehavior: 'smooth',
                        gap: 2,
                        py: 2,
                        px: isMobile ? 0 : 2,
                        flex: 1,
                        '&::-webkit-scrollbar': { display: 'none' },
                        scrollbarWidth: 'none',
                    }}
                >
                    {images.map((src, i) => (
                        <Box
                            key={i}
                            sx={{
                                flex: '0 0 auto',
                                scrollSnapAlign: 'start',
                                borderRadius: 2,
                                overflow: 'hidden',
                                width: {
                                    xs: '100%',
                                    md: `${100 / elementsToShow}%`,
                                },
                                aspectRatio: '4 / 3',
                                backgroundImage: `url(${import.meta.env.VITE_BASE_URL}/images/${src})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                    ))}
                </Box>

                <IconButton
                    onClick={() => handleArrow('right')}
                    sx={{ color: 'black' }}
                    disabled={page === totalPages - 1}
                >
                    <ArrowForwardIos />
                </IconButton>
            </Box>

            <Box display="flex" justifyContent="center" mt={1}>
                {Array.from({ length: totalPages }).map((_, i) => (
                    <IconButton key={i} onClick={() => scrollToPage(i)} size="small">
                        <FiberManualRecord
                            fontSize="extrasmall"
                            sx={{
                                color: i === page ? 'var(--darkgreen-color)' : 'rgba(0, 0, 0, 0.26)',
                            }}
                        />
                    </IconButton>
                ))}
            </Box>
        </Box>
    );

};


export function ImageCarouselWithArrowsIn({ images, elementsToShow = 3 }) {
    const scrollRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const itemsPerPage = isMobile ? 1 : elementsToShow;
    const totalPages = Math.ceil(images.length / itemsPerPage);
    const [page, setPage] = useState(0);

    const scrollToPage = (pageIndex) => {
        const container = scrollRef.current;
        if (!container) return;
        const scrollWidth = container.scrollWidth / totalPages;
        container.scrollTo({
            left: scrollWidth * pageIndex,
            behavior: 'smooth',
        });
        setPage(pageIndex);
    };

    const handleArrow = (direction) => {
        let newPage = page + (direction === 'left' ? -1 : 1);
        newPage = Math.max(0, Math.min(newPage, totalPages - 1));
        scrollToPage(newPage);
    };

    useEffect(() => {
        const handleScroll = () => {
            const container = scrollRef.current;
            if (!container) return;
            const scrollLeft = container.scrollLeft;
            const scrollWidth = container.scrollWidth;
            const currentPage = Math.round(scrollLeft / (scrollWidth / totalPages));
            setPage(currentPage);
        };

        const container = scrollRef.current;
        container?.addEventListener('scroll', handleScroll);
        return () => container?.removeEventListener('scroll', handleScroll);
    }, [totalPages]);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <Box position="relative">
            <Box>
                <IconButton
                    onClick={() => handleArrow('left')}
                    sx={{ position: 'absolute', top: '50%', left: 0, zIndex: 1, color: 'white' }}
                    disabled={page === 0}
                >
                    <ArrowBackIos />
                </IconButton>
                <Box
                    ref={scrollRef}
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollSnapType: 'x mandatory',
                        scrollBehavior: 'smooth',
                        gap: 2,
                        py: 2,
                        px: isMobile ? 0 : 2,
                        '&::-webkit-scrollbar': { display: 'none' },
                        scrollbarWidth: 'none',
                    }}
                >
                    {images.map((src, i) => (
                        <Box
                            key={i}
                            sx={{
                                flex: '0 0 auto',
                                scrollSnapAlign: 'start',
                                borderRadius: 2,
                                overflow: 'hidden',
                                width: {
                                    xs: '100%',
                                    md: `${100 / elementsToShow}%`,
                                },
                                aspectRatio: '20 / 19',
                                backgroundImage: `url(${import.meta.env.VITE_BASE_URL}/images/${src})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                    ))}
                </Box>


                <IconButton
                    onClick={() => handleArrow('right')}
                    sx={{ position: 'absolute', top: '50%', right: 0, zIndex: 1, color: 'white' }}
                    disabled={page === totalPages - 1}
                >
                    <ArrowForwardIos />
                </IconButton>
            </Box>

            <Box display="flex" justifyContent="center" mt={1}>
                {Array.from({ length: totalPages }).map((_, i) => (
                    <IconButton key={i} onClick={() => scrollToPage(i)} size="small">
                        <FiberManualRecord
                            fontSize="extrasmall"
                            sx={{
                                color: i === page ? 'var(--darkgreen-color)' : 'rgba(0, 0, 0, 0.26)',
                            }}
                        />
                    </IconButton>
                ))}
            </Box>
        </Box>
    );
};

export function ProductCarousel() {
    const images = ['product1', 'product2', 'product4', 'product3', 'product8', 'product5', 'product6', 'product7',]
    const scrollRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const itemsPerPage = isMobile ? 1 : 3;
    const totalPages = Math.ceil(images.length / itemsPerPage);
    const [page, setPage] = useState(0);

    const scrollToPage = (pageIndex) => {
        const container = scrollRef.current;
        if (!container) return;
        const scrollWidth = container.scrollWidth / totalPages;
        container.scrollTo({
            left: scrollWidth * pageIndex,
            behavior: 'smooth',
        });
        setPage(pageIndex);
    };

    const handleArrow = (direction) => {
        let newPage = page + (direction === 'left' ? -1 : 1);
        newPage = Math.max(0, Math.min(newPage, totalPages - 1));
        scrollToPage(newPage);
    };

    useEffect(() => {
        const handleScroll = () => {
            const container = scrollRef.current;
            if (!container) return;
            const scrollLeft = container.scrollLeft;
            const scrollWidth = container.scrollWidth;
            const currentPage = Math.round(scrollLeft / (scrollWidth / totalPages));
            setPage(currentPage);
        };

        const container = scrollRef.current;
        container?.addEventListener('scroll', handleScroll);
        return () => container?.removeEventListener('scroll', handleScroll);
    }, [totalPages]);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <Box position="relative">
            <Box>
                <IconButton
                    onClick={() => handleArrow('left')}
                    sx={{ position: 'absolute', top: '50%', left: 0, zIndex: 1, color: 'white' }}
                    disabled={page === 0}
                >
                    <ArrowBackIos />
                </IconButton>
                <Box
                    ref={scrollRef}
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollSnapType: 'x mandatory',
                        scrollBehavior: 'smooth',
                        gap: 2,
                        py: 2,
                        px: isMobile ? 0 : 2,
                        '&::-webkit-scrollbar': { display: 'none' },
                        scrollbarWidth: 'none',
                    }}
                >
                    {images.map((src, i) => (
                        <Box
                            key={i}
                            sx={{
                                flex: '0 0 auto',
                                scrollSnapAlign: 'start',
                                borderRadius: 2,
                                overflow: 'hidden',
                                width: {
                                    xs: '100%',
                                    md: '33.33%',
                                },
                                aspectRatio: '20 / 19',
                                backgroundImage: `url(${import.meta.env.VITE_BASE_URL}/images/${src}.png)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                    ))}
                </Box>


                <IconButton
                    onClick={() => handleArrow('right')}
                    sx={{ position: 'absolute', top: '50%', right: 0, zIndex: 1, color: 'white' }}
                    disabled={page === totalPages - 1}
                >
                    <ArrowForwardIos />
                </IconButton>
            </Box>

            <Box display="flex" justifyContent="center" mt={1}>
                {Array.from({ length: `${isMobile ? totalPages - 2 : totalPages}` }).map((_, i) => (
                    <IconButton key={i} onClick={() => scrollToPage(i)} size="small">
                        <FiberManualRecord
                            fontSize="extrasmall"
                            sx={{
                                color: i === page ? 'var(--darkgreen-color)' : 'rgba(0, 0, 0, 0.26)' // fallback to "disabled" equivalent
                            }}
                        />

                    </IconButton>
                ))}
            </Box>
        </Box>
    );
};
