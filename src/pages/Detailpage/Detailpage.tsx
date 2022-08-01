/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { Flex, Box, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { fetchSinglePost } from '@/service/ghostAPI';
import { renderHTMLContent } from '@/util/renderHTMLContent';
import { MONTHS } from '@/types/constant';
import BaseLayout from '@/layout/BaseLayout';
import { DetailPost } from '@/types/interface';
import { DetailpageProps } from '../../types/interface';
import useFetch from '../../hooks/useFetch';
import Loading from '../Loading';
import PageNotFound from '../PageNotFound';
import DefaultImage from '../../assets/images/logo-sementara.jpeg';

const Detailpage: React.FC<DetailpageProps> = () => {
    const { postId } = useParams();
    const { data, isLoading, error } = useFetch(fetchSinglePost(postId!));

    let post: DetailPost;
    let published_at: string;

    if (data) {
        post = data;
        const date = new Date(post.published_at!);
        published_at = `${date.getDate()} ${
            MONTHS[date.getMonth()]
        } ${date.getFullYear()}`;
    }

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <PageNotFound />;
    }

    return (
        <BaseLayout>
            <Flex
                background="linear-gradient(180deg, #FF9165 -21.55%, #F9DCB0 100%)"
                className="min-h-screen"
            >
                <Flex width="15%">
                    <Box width="100%" height="100%" />
                </Flex>
                <Flex
                    className="my-12 md:my-20"
                    flexDirection="column"
                    width="70%"
                >
                    <div className="font-Body text-overline md:text-body cursor-pointer">
                        <a className="hover:underline" href="/">
                            Home
                        </a>
                        {post!.primary_tag && (
                            <span>
                                {' '}
                                {'>'}{' '}
                                <a
                                    className="hover:underline"
                                    href={`/search?${post!.primary_tag.name}`}
                                >
                                    {post!.primary_tag.name}
                                </a>
                            </span>
                        )}
                    </div>
                    <Box
                        fontFamily="Magilio"
                        fontSize={{
                            base: '20px',
                            md: '35px',
                        }}
                    >
                        {post!.title}
                    </Box>

                    {post!.primary_author && (
                        <Box>Author: {post!.primary_author.name}</Box>
                    )}

                    <Box
                        fontFamily="Alegreya"
                        fontSize={{
                            base: '12px',
                            md: '18px',
                        }}
                    >
                        {published_at!}
                    </Box>
                    <VStack
                        spacing={{
                            base: '12px',
                            md: '24px',
                        }}
                    >
                        {post!.feature_image ? (
                            <Box maxWidth="w-full grid place-items-center">
                                <img className="w-5/12 md:w-4/12 lg:w-3/12" src={post!.feature_image} alt="featured" />
                            </Box>
                        ) : (
                            <Box className="w-full grid place-items-center">
                                <img className="w-5/12 md:w-4/12 lg:w-3/12" src={DefaultImage} alt="default image" />
                            </Box>
                        )}

                        {renderHTMLContent(post!)}
                    </VStack>
                </Flex>
                <Flex width="15%" />
            </Flex>
        </BaseLayout>
    );
};

export default Detailpage;
