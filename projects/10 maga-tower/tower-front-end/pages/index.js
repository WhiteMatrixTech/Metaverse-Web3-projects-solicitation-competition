
import Head from "next/head";
import Layout from "../components/layout";
import Home from "../components/homepage";
import Link from 'next/link'

export default function Index() {
    return (
        <Home />
    )
}

Index.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
